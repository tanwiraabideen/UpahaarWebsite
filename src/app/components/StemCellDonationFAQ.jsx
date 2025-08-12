'use client'
import React from 'react';
import SingleFAQQuestion from './FAQQuestion';
import { useRouter } from 'next/navigation';

const StemCellDonationFAQ = () => {

    const navigate = useRouter()

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="text-center mb-10">
                <p className="text-lg text-gray-600">
                    Find answers to common questions about solid organ donation registration.
                </p>
            </div>

            <div className="space-y-4">

                <SingleFAQQuestion
                    question={"How is stem cell (bone marrow) donation done?"}>
                    <p className="mb-4">There are two methods:</p>

                    <div className="space-y-6">
                        <div>
                            <p className="font-semibold mb-3">a) Peripheral Blood Stem Cell Donation (80% of cases)</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Similar to giving blood.</li>
                                <li>No surgery or anesthesia required.</li>
                                <li>Done as an outpatient procedure.</li>
                                <li>You'll receive daily G-CSF injections for 3–5 days to stimulate stem cell production.</li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold mb-3">b) Bone Marrow Collection (20% of cases)</p>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li>Performed under general anesthesia.</li>
                                <li>A needle draws marrow from the pelvic bone (not the spine).</li>
                                <li>No stitches are needed; minor pain may occur after the procedure.</li>
                                <li>You may need 1–2 days off to recover.</li>
                            </ul>
                        </div>
                    </div>
                </SingleFAQQuestion>
                <SingleFAQQuestion
                    question={"Does the G-CSF injection have side effects?"}>
                    <p>Most donors experience mild bone pain or flu-like symptoms, which are temporary and manageable with paracetamol. Long-term studies show no lasting side effects from G-CSF.</p>
                </SingleFAQQuestion>
                <SingleFAQQuestion
                    question={"Do I permanently lose my stem cells?"}>
                    <p>No. You only donate about 1–2% of your stem cells, and your body replenishes them completely within 6–8 weeks.</p>
                </SingleFAQQuestion>
            </div>

            <div className="mt-12 text-center">
                <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        Still have questions?
                    </h3>
                    <p className="text-blue-700 mb-4">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <button onClick={() => navigate.push('/contact-us')} className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StemCellDonationFAQ;