import { ReviewAnalyticsModule } from './review-analytics.module';

describe('ReviewAnalyticsModule', () => {
  let reviewAnalyticsModule: ReviewAnalyticsModule;

  beforeEach(() => {
    reviewAnalyticsModule = new ReviewAnalyticsModule();
  });

  it('should create an instance', () => {
    expect(reviewAnalyticsModule).toBeTruthy();
  });
});
