'use client';

import { DashBoardPage } from "@/components/Task/DashBoardPage";
import { Header } from "@/components/Task/Nav";

export default function DashBoard() {
  return (
    <div className="bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500">
      <Header />
      <DashBoardPage />
    </div>
  );
}