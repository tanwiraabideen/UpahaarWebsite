import { getFromApi } from "@/lib/api";

describe("getFromApi", () => {
  beforeEach(() => {
    vi.stubEnv("API_URL", "http://api.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("fetches the path from API_URL without caching and returns the JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve([{ id: 1 }]) });
    vi.stubGlobal("fetch", fetchMock);

    await expect(getFromApi("/events")).resolves.toEqual([{ id: 1 }]);
    expect(fetchMock).toHaveBeenCalledWith("http://api.test/events", { cache: "no-store" });
  });

  it("throws with the path and status when the response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    await expect(getFromApi("/stories")).rejects.toThrow("API Route /stories failed: 500");
  });
});
