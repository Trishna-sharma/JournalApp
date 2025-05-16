import { AppBar } from "../components/appBar"
import { Editortiny } from "../components/tinyText"


export const Publish = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-sky-600">
            <AppBar />
            <div className="container mx-auto px-4 py-8 md:py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-8 md:mb-12 shadow-sm">
                    Create New Journal Entry
                </h1>
                <Editortiny />
            </div>
        </div>
    )
}
