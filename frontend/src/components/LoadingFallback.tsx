import { Loader2 } from 'lucide-react'

export default function LoadingFallback() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-red-500">
            <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center">
                <Loader2 className="h-12 w-12 text-red-500 animate-spin motion-reduce:animate-spin" />
                <p className="mt-4 text-lg font-semibold text-red-700">Loading...</p>
            </div>
        </div>
    )
}