import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userNum = searchParams.get("userNum");
    const seasonId = searchParams.get("seasonId") || "2024-1"; // 기본값
    const matchingTeamMode = searchParams.get("matchingTeamMode") || "1"; // 기본값 (1: 솔로)
    const apiKey = process.env.ER_API_KEY;

    if (!apiKey || !userNum) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았거나 userNum이 필요합니다." },
        { status: 400 }
      );
    }

    // 실제 ER API 호출
    try {
      const apiEndpoint = `https://open-api.bser.io/v1/rank/${userNum}/${seasonId}/${matchingTeamMode}`;
      console.log(`Rank API 엔드포인트: ${apiEndpoint}`);

      const response = await fetch(apiEndpoint, {
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
      });

      console.log("Rank API 응답 상태:", response.status);
      console.log(
        "Rank API 응답 헤더:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Rank API 오류 응답:", errorText);
        throw new Error(`API 호출 실패: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Rank API 성공 응답:", data);
      return NextResponse.json(data);
    } catch (apiError) {
      console.error("실제 Rank API 호출 실패:", apiError);

      return NextResponse.json(
        {
          error: "실제 ER API 호출 실패",
          details:
            apiError instanceof Error ? apiError.message : String(apiError),
          endpoint: `https://open-api.bser.io/v1/rank/${userNum}/${seasonId}/${matchingTeamMode}`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("랭킹 정보 조회 오류:", error);
    return NextResponse.json(
      { error: "랭킹 정보 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
