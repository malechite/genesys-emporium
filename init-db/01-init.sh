#!/bin/bash
set -e

# This script runs when the database is first initialized
echo "Database initialization complete for: $POSTGRES_DB"
echo "Run 'yarn migrate' to create database tables"
