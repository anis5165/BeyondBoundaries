'use client';
import { useFormik } from 'formik';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const FeedbackForm = ({ partnerId, partnerName }) => {
    const { currentMember } = useAuth();

    const validationSchema = Yup.object({
        rating: Yup.number()
            .required('Rating is required')
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating must not exceed 5'),
        comment: Yup.string()
            .required('Feedback comment is required')
            .min(10, 'Comment must be at least 10 characters')
            .max(500, 'Comment must not exceed 500 characters'),
        recommendation: Yup.boolean().required('Recommendation is required')
    });

    const feedbackForm = useFormik({
        initialValues: {
            rating: '',
            comment: '',
            recommendation: false
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('http://localhost:5000/feedback/add', {
                    ...values,
                    giverId: currentMember._id,
                    receiverId: partnerId,
                    giverRole: currentMember.role
                });

                if (response.data) {
                    toast.success('Feedback submitted successfully');
                    resetForm();
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
                toast.error('Failed to submit feedback');
            }
        }
    });

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Provide Feedback for {partnerName}</h2>
            
            <form onSubmit={feedbackForm.handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="mt-1 flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => feedbackForm.setFieldValue('rating', star)}
                                className={`text-2xl ${
                                    feedbackForm.values.rating >= star 
                                        ? 'text-yellow-400' 
                                        : 'text-gray-300'
                                }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {feedbackForm.touched.rating && feedbackForm.errors.rating && (
                        <div className="text-red-500 text-sm mt-1">{feedbackForm.errors.rating}</div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Feedback Comment</label>
                    <textarea
                        name="comment"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Share your experience working with this partner..."
                        {...feedbackForm.getFieldProps('comment')}
                    />
                    {feedbackForm.touched.comment && feedbackForm.errors.comment && (
                        <div className="text-red-500 text-sm mt-1">{feedbackForm.errors.comment}</div>
                    )}
                </div>

                <div>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="recommendation"
                            className="rounded text-blue-600 focus:ring-blue-500"
                            {...feedbackForm.getFieldProps('recommendation')}
                        />
                        <span className="text-sm text-gray-700">
                            Would you recommend working with this partner?
                        </span>
                    </label>
                    {feedbackForm.touched.recommendation && feedbackForm.errors.recommendation && (
                        <div className="text-red-500 text-sm mt-1">{feedbackForm.errors.recommendation}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;