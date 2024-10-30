const { test, expect } = require('@playwright/test');
var Base_URL = "https://petstore.swagger.io/v2"
test.skip('should create a new pet and validate response', async ({ request }) => {
  // Send POST request to add a pet
  const response = await request.post(`${Base_URL}/pet`,{
    data: {
      id: 0,
      name: "Fido",
      category: {
        id: 1,
        name: "Dogs"
      },
      photoUrls: ["http://example.com/photo"],
      tags: [
        { id: 1, name: "friendly" }
      ],
      status: "available"
    }
  });

  console.log(await response.json());
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("id");
  expect(responseBody.name).toBe("Fido");
  expect(responseBody.category).toEqual({
    id: 1,
    name: "Dogs"
  });
  expect(responseBody.photoUrls).toContain("http://example.com/photo");
  expect(responseBody.tags).toEqual([{ id: 1, name: "friendly" }]);
  expect(responseBody.status).toBe("available");
});

test.only("should get a pets response", async ({request})=>{

    //const response = await request.post(`${Base_URL}/pet`,
    const response = await request.get("https://petstore.swagger.io/v2/store/inventory");
    console.log(await response.json());
    expect(response.status()).toBe(200)
})

