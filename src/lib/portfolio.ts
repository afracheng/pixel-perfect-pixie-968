export type PortfolioCase = {
  id: string;
  serviceSlug: string;
  title: string;
  before: string;
  after: string;
  afterLabel: string;
  need: string;
  design: string;
  outcome: string;
};

// Only owner-provided, consented case photos and verified descriptions belong here.
export const PORTFOLIO_CASES: PortfolioCase[] = [];