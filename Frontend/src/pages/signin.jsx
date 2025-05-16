import { Auth } from "../components/auth"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return (
        <div className="grid lg:grid-cols-2 h-screen">
            <div className="flex flex-col justify-center items-center 
                        bg-orange-50
                        p-4 md:p-8 overflow-y-auto">
                <Auth type="signin" />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    );
};
