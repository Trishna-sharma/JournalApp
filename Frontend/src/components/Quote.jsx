export const Quote = () => {
    return (
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 h-screen flex justify-center items-center p-4">
            <div className="max-w-lg p-8 bg-white shadow-2xl rounded-xl transform transition-all hover:scale-105">
                <div className="text-center mb-6">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 mb-3">
                        Pen Cil
                    </h1>
                    <p className="text-xl font-medium text-gray-700">
                        Trishna Sharma Mou
                    </p>
                    <p className="text-md text-pink-500 font-semibold">
                        Portfolio Project
                    </p>
                    <a className="text-md text-pink-500 font-semibold" href="https://github.com/Trishna-sharma/JournalApp">
                    https://github.com/Trishna-sharma/JournalApp
                    </a>
                </div>
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-inner">
                    <div className="text-lg font-semibold text-gray-800 mb-3 text-center">
                        Demo Account:
                    </div>
                    <div className="text-md text-gray-700 space-y-1">
                        <div>
                            <strong className="text-purple-600">User:</strong> alpha
                        </div>
                        <div>
                            <strong className="text-purple-600">Password:</strong>  alpha1234
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
