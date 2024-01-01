import "@testing-library/jest-dom";

import { vi, beforeEach } from "vitest";

// This is to gget rid of window.matchMedia error during testing with antd
beforeEach(() => {
  const matchMediaMock = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  const computedStyleMock = vi.fn().mockImplementation(() => ({}));

  vi.stubGlobal("matchMedia", matchMediaMock);
  vi.stubGlobal("computedStyle", computedStyleMock);
});
