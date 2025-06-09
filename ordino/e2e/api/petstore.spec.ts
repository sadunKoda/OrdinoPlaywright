import { test, expect } from '@playwright/test';
import { oi, ApiServiceType } from "@ordino.ai/ordino-engine";

const http = oi.api(ApiServiceType.HTTP);
// Use serial to ensure tests run in order since they depend on each other
test.describe.serial('Pet Store API Tests', () => {
  let petId: number;
  const petName = 'TestDog';
  const updatedPetName = 'UpdatedTestDog';

  test.beforeAll(async () => {
    // Generate a random ID to avoid conflicts
    petId = Math.floor(Math.random() * 1000000);
    console.log(`Generated pet ID for all tests: ${petId}`);
  });

  test.beforeEach(async () => {
    await http.init();
    http.BaseUrl('https://petstore.swagger.io/v2');
  });

  test.afterEach(async () => {
    await http.dispose();
  });

  test('1. Create new pet (POST)', async () => {
    http.setUrl('pet');
    const newPet = {
      id: petId,
      name: petName,
      category: {
        id: 1,
        name: 'Dogs'
      },
      photoUrls: ['https://example.com/dog.jpg'],
      tags: [
        {
          id: 1,
          name: 'friendly'
        }
      ],
      status: 'available'
    };

    const response = await http.requestPost(newPet);
    console.log(`Created pet with ID: ${petId}`);
    expect(response.ok()).toBeTruthy();
    
    const pet = await response.json();
    expect(pet.name).toBe(petName);
    expect(pet.id).toBe(petId);
  });

  test('3. Update pet (PUT)', async () => {
    http.setUrl('pet');
    const updatedPet = {
      id: petId,
      name: updatedPetName,
      category: {
        id: 1,
        name: 'Dogs'
      },
      photoUrls: ['https://example.com/dog.jpg'],
      tags: [
        {
          id: 1,
          name: 'friendly'
        },
        {
          id: 2,
          name: 'trained'
        }
      ],
      status: 'pending'
    };

    console.log(`Updating pet with ID: ${petId}`);
    const response = await http.requestPut(updatedPet);
    expect(response.ok()).toBeTruthy();
    
    const pet = await response.json();
    expect(pet.name).toBe(updatedPetName);
    expect(pet.status).toBe('pending');
  });

  test('4. Delete pet (DELETE)', async () => {
    http.setUrl(`pet/${petId}`);
    console.log(`Deleting pet with ID: ${petId}`);
    const response = await http.requestDelete();
    expect(response.ok()).toBeTruthy();

    // Verify deletion by trying to get the pet
    const getResponse = await http.requestGet();
    expect(getResponse.ok()).toBeFalsy();
  });
});

// Separate describe block for independent tests
test.describe('Pet Store Query Tests', () => {
  test.beforeEach(async () => {
    await http.init();
    http.BaseUrl('https://petstore.swagger.io/v2');
  });

  test.afterEach(async () => {
    await http.dispose();
  });

  test('Get pets by status (GET with query)', async () => {
    http.setUrl('pet/findByStatus?status=available');
    const response = await http.requestGet();
    
    expect(response.ok()).toBeTruthy();
    const pets = await response.json();
    expect(Array.isArray(pets)).toBeTruthy();
    expect(pets.length).toBeGreaterThan(0);
    expect(pets.some(pet => pet.status === 'available')).toBeTruthy();
  });
}); 