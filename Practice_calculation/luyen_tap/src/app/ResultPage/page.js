'use client'
import { useRouter, useSearchParams } from "next/navigation";

function ResultPage(){
    const router = useRouter();
    const search = useSearchParams();
    const trueAnswer = search.get('trueAnswer');
    const duration = search.get('duration');
    const toggleClick = () => {
        router.push('/');
    }
    return(
        <div className="flex flex-col justify-between h-156 w-94 font-semibold">
            <div className="mt-14 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center">
                    <p>Thời gian làm bài</p>
                    <p className="text-red-400">{duration}s</p>
                </div>
                <img src="/huyhieu.png" className="w-46 h-46"></img>
                <div className="p-4 bg-gray-100 text-black text-center w-full h-14">
                    <p>Bạn đã làm đúng {trueAnswer}/10 câu hỏi</p>
                </div>
            </div>
            <button className="btn btn-info btn-block rounded-3xl mt-6" onClick={toggleClick}>Trở Về Trang Chủ</button>
        </div>
    )
}
export default ResultPage;