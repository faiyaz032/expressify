const AppFactory = require('../src/app/app');
const express = require('express');
const request = require('supertest');

describe('AppFactory', () => {
  it('Registers health check route', async () => {
    const app = AppFactory.createApp();
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'Server is healthy',
    });
  });
});
