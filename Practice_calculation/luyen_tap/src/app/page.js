'use client'
import NumberOfOperation from "../components/Main/NumberOfOperation";
import ParticipationOperations from "@/components/Main/ParticipationOperations";
import RangeOfOperands from "@/components/Main/RangeOfOperands";
import RangeOfResult from "@/components/Main/RangeOfResult";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const toggleCick = () => {
    router.push('/OperationPage');
  }
  return (
    <div className="pt-3 w-94">
        <img src="/logo.png" alt="logo" className="h-40" />
        <NumberOfOperation />
        <ParticipationOperations />
        <RangeOfOperands />
        <RangeOfResult />
        <button className="btn btn-info btn-block rounded-3xl mt-6" onClick={toggleCick}>Bắt Đầu Luyện Tập</button>
    </div>
  );
}
