import { useState, useEffect } from 'react';

export default function StatCard({ number, label, symbol = '', duration = 2000, delay = 0 }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);

            const startTime = Date.now();
            const startValue = 0;
            const endValue = number;

            const updateCount = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

                setCount(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                }
            };

            requestAnimationFrame(updateCount);
        }, delay);

        return () => clearTimeout(timer);
    }, [number, duration, delay]);

    return (
        <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <div className="bg-blue-200 lg:w-45 lg:mt-10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border ">
                <div className="text-4xl font-black text-gray-800 mb-3 leading-none">
                    {count.toLocaleString()}
                    <span className="text-indigo-600 ml-2">{symbol}</span>
                </div>
                <div className="text-gray-600 text-md font-medium leading-relaxed">
                    {label}
                </div>
            </div>
        </div>
    );
};
