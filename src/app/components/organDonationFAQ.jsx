'use client'
import React from 'react';
import SingleFAQQuestion from './FAQQuestion';
import { useRouter } from 'next/navigation';

const FAQDisclosure = () => {

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
                    question={"Who can register as a donor?"}>
                    <p>Anyone aged 17 to 55 and in good health can register as a potential donor with Delete Blood Cancer UK.</p>
                </SingleFAQQuestion>
                <SingleFAQQuestion
                    question={"Are there any medical conditions that prevent me from donating?"}>
                    <p>Yes. You may not be eligible to donate if you have:</p><br />
                    <ul className="list-disc list-inside space-y-1">
                        <li>Heart disease (e.g., past heart attack)</li>
                        <li>Severe lung conditions (e.g., chronic asthma)</li>
                        <li>Severe kidney disease</li>
                        <li>Cancer (past or present)</li>
                        <li>HIV or AIDS</li>
                        <li>Metabolic disorders (e.g., diabetes)</li>
                        <li>Autoimmune diseases (e.g., rheumatoid arthritis)</li>
                        <li>Severe infections (e.g., hepatitis B or C)</li>
                        <li>Weight under 50 kg or BMI over 40</li>
                    </ul><br />
                    <p>A detailed health assessment is done before donation to ensure it’s safe for both you and the patient.</p>
                </SingleFAQQuestion>
                <SingleFAQQuestion
                    question={"How is the cheek swab test done?"}>
                    <p>At our registration drives:</p><br />
                    <ul className="list-disc list-inside space-y-1">
                        <li>Fill in the registration form.</li>
                        <li>You’ll be given a swab kit with two swabs.</li>
                        <li>Rub each swab inside your cheeks for 30 seconds.</li>
                        <li>Let the swabs dry (1–2 minutes), then place them in the envelope provided.</li>
                        <li>Return the envelope to our volunteers.</li>
                    </ul><br />
                    <p>Your samples are sent to a lab to determine your HLA type. Keep your registration number as reference. You’ll receive a registration card within a few weeks.</p>
                </SingleFAQQuestion>
                <SingleFAQQuestion
                    question={"What are my chances of being a match?"}>
                    <p>Finding a match is rare—only about 4–5% of donors are matched within ten years of registering. Matches are more likely within the same ethnic background. That’s why it’s crucial for more South Asians to register to improve the chances for South Asian patients.</p>
                </SingleFAQQuestion>
                <SingleFAQQuestion
                    question={"Will I be informed if I’m a match?"}>
                    <p>Yes. You’ll receive detailed information at the time of donation. You can always change your mind, even at that point.</p>
                </SingleFAQQuestion>
                <SingleFAQQuestion
                    question={"Why do we need more South Asian stem cell donors?"}>
                    <p>A successful transplant depends on finding a closely matched donor, and ethnicity plays a key role. Only 4% of donors in the UK registry are from South Asian backgrounds, which makes it harder for South Asian patients to find a match..</p>
                    <br />
                    <p>Bone marrow donation is a simple and safe process, but myths and lack of awareness have discouraged many. Your registration could help save a life.</p>
                </SingleFAQQuestion>
            </div>

            <div className="mt-12 text-center">
                <div className="bg-blue-200 rounded-lg p-6">
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

export default FAQDisclosure;