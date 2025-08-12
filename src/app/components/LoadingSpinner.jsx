export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin-reverse"></div>
            </div>
        </div>
    );
}
