import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to api/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  expect(responseBody.dependencies.database.version).toEqual("17.0");
  expect(responseBody.dependencies.database.max_connections).toEqual("100");
  expect(responseBody.dependencies.database.oppend_connections).toEqual("1");
});
