CREATE DATABASE logistic;
psql --username postgres --dbname logistic

CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  vehicle_plate VARCHAR(20) UNIQUE NOT NULL,
  current_status INTEGER NOT NULL,
  is_active BOOLEAN
);
CREATE TABLE IF NOT EXISTS devices (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
  device_type_id INTEGER REFERENCES device_type(id) ON DELETE CASCADE,
  device_name VARCHAR (75) NOT NULL,
  is_online BOOLEAN,
  is_active BOOLEAN
);
CREATE TABLE IF NOT EXISTS device_type (
  id SERIAL PRIMARY KEY,
  device_name VARCHAR (75) NOT NULL,
  device_description VARCHAR (255) NOT NULL,
  is_active BOOLEAN);
CREATE TABLE IF NOT EXISTS log_tempature (
  id SERIAL,
  vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
  device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
  read_data VARCHAR (50) NOT NULL,
  created_on DATE NOT NULL,
  PRIMARY KEY (id, vehicle_id, device_id)
);
CREATE TABLE IF NOT EXISTS log_location (
  id SERIAL,
  vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
  device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
  latitude VARCHAR (50) NOT NULL,
  longtitude VARCHAR (50) NOT NULL,
  created_on DATE NOT NULL,
  PRIMARY KEY (id, vehicle_id, device_id)
);
