"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SingleFAQQuestion = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
                className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-medium text-gray-900 pr-4">
                    {question}
                </span>
                <ChevronDown
                    className={`${isOpen ? 'rotate-180' : ''} h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0`}
                />
            </button>

            {isOpen && (
                <div className="px-6 pb-4 transition-all duration-200 ease-out">
                    <div className="border-t border-gray-100 pt-4">
                        <div className="text-gray-700 leading-relaxed break-words">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleFAQQuestion;
