export const Quote = () => {
    return (
        <div className="bg-white h-screen flex justify-center items-center">
            <div className="max-w-lg p-6 shadow-lg rounded-lg border border-gray-200">
                <div className="text-4xl font-extrabold text-gray-800 mb-4">
                    Journal Web Application
                </div>
                <div className="text-lg font-medium text-gray-600 mb-2">
                    Trishna Sharma Mou
                </div>
                <div className="text-sm text-gray-500 mb-6">
                    Portfolio Project
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                        Demo Account:
                    </div>
                    <div className="text-sm text-gray-600">
                        <strong>User:</strong> DemoUser
                        <br />
                        <strong>Password:</strong> 12345678
                    </div>
                </div>
            </div>
        </div>
    );
};
