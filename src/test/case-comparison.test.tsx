import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CaseComparison } from "@/components/case-comparison";
import type { PortfolioCase } from "@/lib/portfolio";

describe("Case comparison", () => {
  it("shows an honest empty state without invented cases", () => {
    render(<CaseComparison cases={[]} />);
    expect(screen.getByText("待授權案例上架後開放比較。")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });
  it("compares two selected clients and allows deselection", () => {
    const cases: PortfolioCase[] = [1, 2, 3].map((id) => ({ id: String(id), serviceSlug: "powder-brows", title: `測試案例${id}`, before: "/test-before.jpg", after: "/test-after.jpg", afterLabel: "恢復後", need: "測試需求", design: "測試設計", outcome: "測試追蹤" }));
    render(<CaseComparison cases={cases} />);
    const clickFirst = (name: string) => {
      const button = screen.getAllByRole("button", { name })[0];
      if (!button) throw new Error(`Missing ${name} button`);
      fireEvent.click(button);
    };
    clickFirst("加入比較");
    clickFirst("加入比較");
    expect(screen.getAllByText("測試案例1")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "加入比較" }).hasAttribute("disabled")).toBe(true);
    clickFirst("取消比較");
    expect(screen.getByText("已選 1 / 2 個案例")).toBeTruthy();
  });
});