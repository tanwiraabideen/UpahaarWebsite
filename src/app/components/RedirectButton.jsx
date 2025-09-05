'use client'
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function RegistrationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonRect, setButtonRect] = useState(null);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Close dropdown when clicking outside or scrolling
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleScroll() {
            if (isOpen) {
                // Update position on scroll
                if (buttonRef.current) {
                    const rect = buttonRef.current.getBoundingClientRect();
                    setButtonRect(rect);
                }
            }
        }

        function handleResize() {
            if (isOpen) {
                setIsOpen(false); // Close on resize for simplicity
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true); // Use capture to catch all scroll events
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', handleResize);
        };
    }, [isOpen]);

    // Update button position when dropdown opens
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setButtonRect(rect);
        }
    }, [isOpen]);

    const DropdownContent = () => (
        <div
            ref={dropdownRef}
            className="w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            style={{
                position: 'fixed',
                top: buttonRect ? buttonRect.bottom + 8 : 0,
                left: buttonRect ? Math.max(16, Math.min(buttonRect.left, window.innerWidth - 288 - 16)) : 0,
                zIndex: 9999
            }}
        >
            <div className="py-2">
                <button
                    onClick={handleStemCellRegistration}
                    className="w-full text-left px-4 py-3 hover:cursor-pointer hover:bg-green-50 transition-colors duration-150 flex items-center gap-3 group"
                >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">Stem Cell Donation</div>
                        <div className="text-sm text-gray-600">Help fight blood cancers</div>
                    </div>
                </button>

                <button
                    onClick={handleOrganDonationRegistration}
                    className="w-full text-left px-4 py-3 hover:cursor-pointer hover:bg-green-50 transition-colors duration-150 flex items-center gap-3 group"
                >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">Organ Donation</div>
                        <div className="text-sm text-gray-600">Save lives through organ donation</div>
                    </div>
                </button>
            </div>
        </div>
    );

    const handleStemCellRegistration = () => {
        window.open('https://www.dkms.org/register-now', '_blank');
        setIsOpen(false);
    };

    const handleOrganDonationRegistration = () => {
        // Replace with actual organ donation registration URL
        window.open('https://www.organdonation.nhs.uk', '_blank');
        setIsOpen(false);
    };

    return (
        <>
            <div className="relative inline-block">
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-sm md:text-sm lg:text-xl btn btn-lg btn-success rounded-full flex items-center gap-2 hover:shadow-lg transition-all duration-200"
                >
                    Donate Now
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {isOpen && buttonRect && typeof window !== 'undefined' &&
                createPortal(<DropdownContent />, document.body)
            }
        </>
    );
}