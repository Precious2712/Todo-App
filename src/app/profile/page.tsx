'use client';

import { DashBoardPage } from "@/components/Task/DashBoardPage";
import { Header } from "@/components/Task/Nav";

export default function DashBoard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">
      <Header />
      <div className="pt-2 lg:pt-5">
        <DashBoardPage />
      </div>
    </div>
  );
}