export PATH := ./node_modules/.bin:$(PATH)

.PHONY: start test bootstrap migrate

start:
	node .

test:
	NODE_ENV=test node_modules/.bin/mocha --coverage && node_modules/.bin/standard

deps:
	npm install

bootstrap: deps

migrate:
	NODE_ENV=test node_modules/.bin/knex create:db everwhere_test
	NODE_ENV=test node_modules/.bin/knex migrate:latest