"use client";

import Link from "next/link";

export default function TestMainPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        ER API 테스트 메인
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/test/player-search"
          className="block p-6 bg-blue-100 hover:bg-blue-200 rounded-lg border border-blue-300 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 text-blue-800">
            🔍 플레이어 검색
          </h2>
          <p className="text-blue-600">
            닉네임으로 플레이어 정보 검색
            <br />
            <code className="text-sm">/v1/user/nickname</code>
          </p>
        </Link>

        <Link
          href="/test/games"
          className="block p-6 bg-green-100 hover:bg-green-200 rounded-lg border border-green-300 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 text-green-800">
            🎮 게임 기록
          </h2>
          <p className="text-green-600">
            UserNum으로 게임 기록 조회
            <br />
            <code className="text-sm">/v1/user/games/{userNum}</code>
          </p>
        </Link>

        <Link
          href="/test/sequential"
          className="block p-6 bg-purple-100 hover:bg-purple-200 rounded-lg border border-purple-300 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 text-purple-800">
            🔗 연속 호출
          </h2>
          <p className="text-purple-600">
            플레이어 검색 → 게임 기록 조회
            <br />
            <code className="text-sm">연속 API 호출</code>
          </p>
        </Link>

        <Link
          href="/test/rank"
          className="block p-6 bg-yellow-100 hover:bg-yellow-200 rounded-lg border border-yellow-300 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 text-yellow-800">
            🏆 랭크 정보
          </h2>
          <p className="text-yellow-600">
            UserNum으로 랭크 정보 조회
            <br />
            <code className="text-sm">/v1/rank/{userNum}</code>
          </p>
        </Link>

        <Link
          href="/test/stats"
          className="block p-6 bg-red-100 hover:bg-red-200 rounded-lg border border-red-300 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 text-red-800">
            📊 통계 정보
          </h2>
          <p className="text-red-600">
            플레이어 통계 정보 조회
            <br />
            <code className="text-sm">/v1/user/stats</code>
          </p>
        </Link>

        <Link
          href="/test/all"
          className="block p-6 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            🧪 모든 API
          </h2>
          <p className="text-gray-600">
            모든 API 테스트 (기존)
            <br />
            <code className="text-sm">통합 테스트</code>
          </p>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
          ← 메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
