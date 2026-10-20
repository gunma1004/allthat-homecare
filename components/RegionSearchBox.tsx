// components/RegionSearchBox.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { regionData } from "@/data/regions";

export default function RegionSearchBox() {
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDongs =
    selectedDistrict && currentDistricts[selectedDistrict]
      ? currentDistricts[selectedDistrict].dongs
      : [];

  const districtName = currentDistricts[selectedDistrict]?.name || selectedDistrict;
  const searchUrl = selectedDong
    ? `/${selectedRegion}/${encodeURIComponent(districtName)}/${encodeURIComponent(selectedDong)}`
    : `/${selectedRegion}/${encodeURIComponent(districtName)}`;

  return (
    <div className="bg-gradient-to-b from-[#16161b] to-[#0e0e12] border border-amber-500/30 p-6 rounded-3xl max-w-xl mx-auto shadow-2xl text-left">
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs text-amber-400 font-black uppercase tracking-wider flex items-center gap-1.5">
          📍 내 주변 맞춤 출장 테라피 찾기
        </label>
        <span className="text-[11px] text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
          서울·경기·인천 전역
        </span>
      </div>

      <div className="space-y-3.5">
        <div>
          <span className="text-[11px] text-gray-400 block mb-1 font-semibold">1단계: 광역 시·도 선택</span>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30"
          >
            {Object.keys(regionData).map((key) => (
              <option key={key} value={key} className="bg-[#1c1c1f]">
                {regionData[key].name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="text-[11px] text-gray-400 block mb-1 font-semibold">2단계: 구·시·군 선택</span>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30"
          >
            <option value="">구 / 시 / 군을 선택해주세요</option>
            {Object.keys(currentDistricts).map((dKey) => (
              <option key={dKey} value={dKey} className="bg-[#1c1c1f]">
                {currentDistricts[dKey].name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="text-[11px] text-gray-400 block mb-1 font-semibold">3단계: 동 선택 (세부 필터)</span>
          <select
            value={selectedDong}
            onChange={(e) => setSelectedDong(e.target.value)}
            disabled={!selectedDistrict}
            className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/30 disabled:opacity-30"
          >
            <option value="">동 전체 보기</option>
            {currentDongs.map((dong, idx) => (
              <option key={idx} value={dong} className="bg-[#1c1c1f]">
                {dong}
              </option>
            ))}
          </select>
        </div>

        {selectedDistrict ? (
          <Link
            href={searchUrl}
            className="w-full block text-center bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 text-black font-black py-4 rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] mt-3"
          >
            🔍 선택한 지역 출장 테라피 정보 확인하기
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => alert("원하시는 지역(구/시/군)을 먼저 선택해주세요!")}
            className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 opacity-60 text-black font-black py-4 rounded-2xl text-sm mt-3 cursor-not-allowed"
          >
            🔍 지역(구/시/군)을 선택해주세요
          </button>
        )}
      </div>
    </div>
  );
}