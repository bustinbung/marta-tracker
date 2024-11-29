// code generated by pbf v4.0.1

export function readFeedMessage(pbf, end) {
	return pbf.readFields(readFeedMessageField, { header: undefined, entity: [] }, end);
}
function readFeedMessageField(tag, obj, pbf) {
	if (tag === 1) obj.header = readFeedHeader(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 2) obj.entity.push(readFeedEntity(pbf, pbf.readVarint() + pbf.pos));
}
export function writeFeedMessage(obj, pbf) {
	if (obj.header) pbf.writeMessage(1, writeFeedHeader, obj.header);
	if (obj.entity) for (const item of obj.entity) pbf.writeMessage(2, writeFeedEntity, item);
}

export function readFeedHeader(pbf, end) {
	return pbf.readFields(
		readFeedHeaderField,
		{ gtfs_realtime_version: '', incrementality: 0, timestamp: 0 },
		end
	);
}
function readFeedHeaderField(tag, obj, pbf) {
	if (tag === 1) obj.gtfs_realtime_version = pbf.readString();
	else if (tag === 2) obj.incrementality = pbf.readVarint();
	else if (tag === 3) obj.timestamp = pbf.readVarint();
}
export function writeFeedHeader(obj, pbf) {
	if (obj.gtfs_realtime_version) pbf.writeStringField(1, obj.gtfs_realtime_version);
	if (obj.incrementality) pbf.writeVarintField(2, obj.incrementality);
	if (obj.timestamp) pbf.writeVarintField(3, obj.timestamp);
}

export const FeedHeaderIncrementality = {
	FULL_DATASET: 0,
	DIFFERENTIAL: 1
};

export function readFeedEntity(pbf, end) {
	return pbf.readFields(
		readFeedEntityField,
		{
			id: '',
			is_deleted: false,
			trip_update: undefined,
			vehicle: undefined,
			alert: undefined,
			shape: undefined,
			stop: undefined,
			trip_modifications: undefined
		},
		end
	);
}
function readFeedEntityField(tag, obj, pbf) {
	if (tag === 1) obj.id = pbf.readString();
	else if (tag === 2) obj.is_deleted = pbf.readBoolean();
	else if (tag === 3) obj.trip_update = readTripUpdate(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 4) obj.vehicle = readVehiclePosition(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 5) obj.alert = readAlert(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 6) obj.shape = readShape(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 7) obj.stop = readStop(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 8)
		obj.trip_modifications = readTripModifications(pbf, pbf.readVarint() + pbf.pos);
}
export function writeFeedEntity(obj, pbf) {
	if (obj.id) pbf.writeStringField(1, obj.id);
	if (obj.is_deleted) pbf.writeBooleanField(2, obj.is_deleted);
	if (obj.trip_update) pbf.writeMessage(3, writeTripUpdate, obj.trip_update);
	if (obj.vehicle) pbf.writeMessage(4, writeVehiclePosition, obj.vehicle);
	if (obj.alert) pbf.writeMessage(5, writeAlert, obj.alert);
	if (obj.shape) pbf.writeMessage(6, writeShape, obj.shape);
	if (obj.stop) pbf.writeMessage(7, writeStop, obj.stop);
	if (obj.trip_modifications) pbf.writeMessage(8, writeTripModifications, obj.trip_modifications);
}

export function readTripUpdate(pbf, end) {
	return pbf.readFields(
		readTripUpdateField,
		{
			trip: undefined,
			vehicle: undefined,
			stop_time_update: [],
			timestamp: 0,
			delay: 0,
			trip_properties: undefined
		},
		end
	);
}
function readTripUpdateField(tag, obj, pbf) {
	if (tag === 1) obj.trip = readTripDescriptor(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 3) obj.vehicle = readVehicleDescriptor(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 2)
		obj.stop_time_update.push(readTripUpdateStopTimeUpdate(pbf, pbf.readVarint() + pbf.pos));
	else if (tag === 4) obj.timestamp = pbf.readVarint();
	else if (tag === 5) obj.delay = pbf.readVarint(true);
	else if (tag === 6)
		obj.trip_properties = readTripUpdateTripProperties(pbf, pbf.readVarint() + pbf.pos);
}
export function writeTripUpdate(obj, pbf) {
	if (obj.trip) pbf.writeMessage(1, writeTripDescriptor, obj.trip);
	if (obj.vehicle) pbf.writeMessage(3, writeVehicleDescriptor, obj.vehicle);
	if (obj.stop_time_update)
		for (const item of obj.stop_time_update)
			pbf.writeMessage(2, writeTripUpdateStopTimeUpdate, item);
	if (obj.timestamp) pbf.writeVarintField(4, obj.timestamp);
	if (obj.delay) pbf.writeVarintField(5, obj.delay);
	if (obj.trip_properties) pbf.writeMessage(6, writeTripUpdateTripProperties, obj.trip_properties);
}

export function readTripUpdateStopTimeEvent(pbf, end) {
	return pbf.readFields(
		readTripUpdateStopTimeEventField,
		{ delay: 0, time: 0, uncertainty: 0 },
		end
	);
}
function readTripUpdateStopTimeEventField(tag, obj, pbf) {
	if (tag === 1) obj.delay = pbf.readVarint(true);
	else if (tag === 2) obj.time = pbf.readVarint(true);
	else if (tag === 3) obj.uncertainty = pbf.readVarint(true);
}
export function writeTripUpdateStopTimeEvent(obj, pbf) {
	if (obj.delay) pbf.writeVarintField(1, obj.delay);
	if (obj.time) pbf.writeVarintField(2, obj.time);
	if (obj.uncertainty) pbf.writeVarintField(3, obj.uncertainty);
}

export function readTripUpdateStopTimeUpdate(pbf, end) {
	return pbf.readFields(
		readTripUpdateStopTimeUpdateField,
		{
			stop_sequence: 0,
			stop_id: '',
			arrival: undefined,
			departure: undefined,
			departure_occupancy_status: 0,
			schedule_relationship: 0,
			stop_time_properties: undefined
		},
		end
	);
}
function readTripUpdateStopTimeUpdateField(tag, obj, pbf) {
	if (tag === 1) obj.stop_sequence = pbf.readVarint();
	else if (tag === 4) obj.stop_id = pbf.readString();
	else if (tag === 2) obj.arrival = readTripUpdateStopTimeEvent(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 3) obj.departure = readTripUpdateStopTimeEvent(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 7) obj.departure_occupancy_status = pbf.readVarint();
	else if (tag === 5) obj.schedule_relationship = pbf.readVarint();
	else if (tag === 6)
		obj.stop_time_properties = readTripUpdateStopTimeUpdateStopTimeProperties(
			pbf,
			pbf.readVarint() + pbf.pos
		);
}
export function writeTripUpdateStopTimeUpdate(obj, pbf) {
	if (obj.stop_sequence) pbf.writeVarintField(1, obj.stop_sequence);
	if (obj.stop_id) pbf.writeStringField(4, obj.stop_id);
	if (obj.arrival) pbf.writeMessage(2, writeTripUpdateStopTimeEvent, obj.arrival);
	if (obj.departure) pbf.writeMessage(3, writeTripUpdateStopTimeEvent, obj.departure);
	if (obj.departure_occupancy_status) pbf.writeVarintField(7, obj.departure_occupancy_status);
	if (obj.schedule_relationship) pbf.writeVarintField(5, obj.schedule_relationship);
	if (obj.stop_time_properties)
		pbf.writeMessage(6, writeTripUpdateStopTimeUpdateStopTimeProperties, obj.stop_time_properties);
}

export const TripUpdateStopTimeUpdateScheduleRelationship = {
	SCHEDULED: 0,
	SKIPPED: 1,
	NO_DATA: 2,
	UNSCHEDULED: 3
};

export function readTripUpdateStopTimeUpdateStopTimeProperties(pbf, end) {
	return pbf.readFields(
		readTripUpdateStopTimeUpdateStopTimePropertiesField,
		{ assigned_stop_id: '' },
		end
	);
}
function readTripUpdateStopTimeUpdateStopTimePropertiesField(tag, obj, pbf) {
	if (tag === 1) obj.assigned_stop_id = pbf.readString();
}
export function writeTripUpdateStopTimeUpdateStopTimeProperties(obj, pbf) {
	if (obj.assigned_stop_id) pbf.writeStringField(1, obj.assigned_stop_id);
}

export function readTripUpdateTripProperties(pbf, end) {
	return pbf.readFields(
		readTripUpdateTripPropertiesField,
		{ trip_id: '', start_date: '', start_time: '', shape_id: '' },
		end
	);
}
function readTripUpdateTripPropertiesField(tag, obj, pbf) {
	if (tag === 1) obj.trip_id = pbf.readString();
	else if (tag === 2) obj.start_date = pbf.readString();
	else if (tag === 3) obj.start_time = pbf.readString();
	else if (tag === 4) obj.shape_id = pbf.readString();
}
export function writeTripUpdateTripProperties(obj, pbf) {
	if (obj.trip_id) pbf.writeStringField(1, obj.trip_id);
	if (obj.start_date) pbf.writeStringField(2, obj.start_date);
	if (obj.start_time) pbf.writeStringField(3, obj.start_time);
	if (obj.shape_id) pbf.writeStringField(4, obj.shape_id);
}

export function readVehiclePosition(pbf, end) {
	return pbf.readFields(
		readVehiclePositionField,
		{
			trip: undefined,
			vehicle: undefined,
			position: undefined,
			current_stop_sequence: 0,
			stop_id: '',
			current_status: 2,
			timestamp: 0,
			congestion_level: 0,
			occupancy_status: 0,
			occupancy_percentage: 0,
			multi_carriage_details: []
		},
		end
	);
}
function readVehiclePositionField(tag, obj, pbf) {
	if (tag === 1) obj.trip = readTripDescriptor(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 8) obj.vehicle = readVehicleDescriptor(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 2) obj.position = readPosition(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 3) obj.current_stop_sequence = pbf.readVarint();
	else if (tag === 7) obj.stop_id = pbf.readString();
	else if (tag === 4) obj.current_status = pbf.readVarint();
	else if (tag === 5) obj.timestamp = pbf.readVarint();
	else if (tag === 6) obj.congestion_level = pbf.readVarint();
	else if (tag === 9) obj.occupancy_status = pbf.readVarint();
	else if (tag === 10) obj.occupancy_percentage = pbf.readVarint();
	else if (tag === 11)
		obj.multi_carriage_details.push(
			readVehiclePositionCarriageDetails(pbf, pbf.readVarint() + pbf.pos)
		);
}
export function writeVehiclePosition(obj, pbf) {
	if (obj.trip) pbf.writeMessage(1, writeTripDescriptor, obj.trip);
	if (obj.vehicle) pbf.writeMessage(8, writeVehicleDescriptor, obj.vehicle);
	if (obj.position) pbf.writeMessage(2, writePosition, obj.position);
	if (obj.current_stop_sequence) pbf.writeVarintField(3, obj.current_stop_sequence);
	if (obj.stop_id) pbf.writeStringField(7, obj.stop_id);
	if (obj.current_status != null && obj.current_status !== 2)
		pbf.writeVarintField(4, obj.current_status);
	if (obj.timestamp) pbf.writeVarintField(5, obj.timestamp);
	if (obj.congestion_level) pbf.writeVarintField(6, obj.congestion_level);
	if (obj.occupancy_status) pbf.writeVarintField(9, obj.occupancy_status);
	if (obj.occupancy_percentage) pbf.writeVarintField(10, obj.occupancy_percentage);
	if (obj.multi_carriage_details)
		for (const item of obj.multi_carriage_details)
			pbf.writeMessage(11, writeVehiclePositionCarriageDetails, item);
}

export const VehiclePositionVehicleStopStatus = {
	INCOMING_AT: 0,
	STOPPED_AT: 1,
	IN_TRANSIT_TO: 2
};

export const VehiclePositionCongestionLevel = {
	UNKNOWN_CONGESTION_LEVEL: 0,
	RUNNING_SMOOTHLY: 1,
	STOP_AND_GO: 2,
	CONGESTION: 3,
	SEVERE_CONGESTION: 4
};

export const VehiclePositionOccupancyStatus = {
	EMPTY: 0,
	MANY_SEATS_AVAILABLE: 1,
	FEW_SEATS_AVAILABLE: 2,
	STANDING_ROOM_ONLY: 3,
	CRUSHED_STANDING_ROOM_ONLY: 4,
	FULL: 5,
	NOT_ACCEPTING_PASSENGERS: 6,
	NO_DATA_AVAILABLE: 7,
	NOT_BOARDABLE: 8
};

export function readVehiclePositionCarriageDetails(pbf, end) {
	return pbf.readFields(
		readVehiclePositionCarriageDetailsField,
		{ id: '', label: '', occupancy_status: 7, occupancy_percentage: -1, carriage_sequence: 0 },
		end
	);
}
function readVehiclePositionCarriageDetailsField(tag, obj, pbf) {
	if (tag === 1) obj.id = pbf.readString();
	else if (tag === 2) obj.label = pbf.readString();
	else if (tag === 3) obj.occupancy_status = pbf.readVarint();
	else if (tag === 4) obj.occupancy_percentage = pbf.readVarint(true);
	else if (tag === 5) obj.carriage_sequence = pbf.readVarint();
}
export function writeVehiclePositionCarriageDetails(obj, pbf) {
	if (obj.id) pbf.writeStringField(1, obj.id);
	if (obj.label) pbf.writeStringField(2, obj.label);
	if (obj.occupancy_status != null && obj.occupancy_status !== 7)
		pbf.writeVarintField(3, obj.occupancy_status);
	if (obj.occupancy_percentage != null && obj.occupancy_percentage !== -1)
		pbf.writeVarintField(4, obj.occupancy_percentage);
	if (obj.carriage_sequence) pbf.writeVarintField(5, obj.carriage_sequence);
}

export function readAlert(pbf, end) {
	return pbf.readFields(
		readAlertField,
		{
			active_period: [],
			informed_entity: [],
			cause: 1,
			effect: 8,
			url: undefined,
			header_text: undefined,
			description_text: undefined,
			tts_header_text: undefined,
			tts_description_text: undefined,
			severity_level: 1,
			image: undefined,
			image_alternative_text: undefined,
			cause_detail: undefined,
			effect_detail: undefined
		},
		end
	);
}
function readAlertField(tag, obj, pbf) {
	if (tag === 1) obj.active_period.push(readTimeRange(pbf, pbf.readVarint() + pbf.pos));
	else if (tag === 5) obj.informed_entity.push(readEntitySelector(pbf, pbf.readVarint() + pbf.pos));
	else if (tag === 6) obj.cause = pbf.readVarint();
	else if (tag === 7) obj.effect = pbf.readVarint();
	else if (tag === 8) obj.url = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 10) obj.header_text = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 11) obj.description_text = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 12) obj.tts_header_text = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 13)
		obj.tts_description_text = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 14) obj.severity_level = pbf.readVarint();
	else if (tag === 15) obj.image = readTranslatedImage(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 16)
		obj.image_alternative_text = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 17) obj.cause_detail = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 18) obj.effect_detail = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
}
export function writeAlert(obj, pbf) {
	if (obj.active_period)
		for (const item of obj.active_period) pbf.writeMessage(1, writeTimeRange, item);
	if (obj.informed_entity)
		for (const item of obj.informed_entity) pbf.writeMessage(5, writeEntitySelector, item);
	if (obj.cause != null && obj.cause !== 1) pbf.writeVarintField(6, obj.cause);
	if (obj.effect != null && obj.effect !== 8) pbf.writeVarintField(7, obj.effect);
	if (obj.url) pbf.writeMessage(8, writeTranslatedString, obj.url);
	if (obj.header_text) pbf.writeMessage(10, writeTranslatedString, obj.header_text);
	if (obj.description_text) pbf.writeMessage(11, writeTranslatedString, obj.description_text);
	if (obj.tts_header_text) pbf.writeMessage(12, writeTranslatedString, obj.tts_header_text);
	if (obj.tts_description_text)
		pbf.writeMessage(13, writeTranslatedString, obj.tts_description_text);
	if (obj.severity_level != null && obj.severity_level !== 1)
		pbf.writeVarintField(14, obj.severity_level);
	if (obj.image) pbf.writeMessage(15, writeTranslatedImage, obj.image);
	if (obj.image_alternative_text)
		pbf.writeMessage(16, writeTranslatedString, obj.image_alternative_text);
	if (obj.cause_detail) pbf.writeMessage(17, writeTranslatedString, obj.cause_detail);
	if (obj.effect_detail) pbf.writeMessage(18, writeTranslatedString, obj.effect_detail);
}

export const AlertCause = {
	UNKNOWN_CAUSE: 1,
	OTHER_CAUSE: 2,
	TECHNICAL_PROBLEM: 3,
	STRIKE: 4,
	DEMONSTRATION: 5,
	ACCIDENT: 6,
	HOLIDAY: 7,
	WEATHER: 8,
	MAINTENANCE: 9,
	CONSTRUCTION: 10,
	POLICE_ACTIVITY: 11,
	MEDICAL_EMERGENCY: 12
};

export const AlertEffect = {
	NO_SERVICE: 1,
	REDUCED_SERVICE: 2,
	SIGNIFICANT_DELAYS: 3,
	DETOUR: 4,
	ADDITIONAL_SERVICE: 5,
	MODIFIED_SERVICE: 6,
	OTHER_EFFECT: 7,
	UNKNOWN_EFFECT: 8,
	STOP_MOVED: 9,
	NO_EFFECT: 10,
	ACCESSIBILITY_ISSUE: 11
};

export const AlertSeverityLevel = {
	UNKNOWN_SEVERITY: 1,
	INFO: 2,
	WARNING: 3,
	SEVERE: 4
};

export function readTimeRange(pbf, end) {
	return pbf.readFields(readTimeRangeField, { start: 0, end: 0 }, end);
}
function readTimeRangeField(tag, obj, pbf) {
	if (tag === 1) obj.start = pbf.readVarint();
	else if (tag === 2) obj.end = pbf.readVarint();
}
export function writeTimeRange(obj, pbf) {
	if (obj.start) pbf.writeVarintField(1, obj.start);
	if (obj.end) pbf.writeVarintField(2, obj.end);
}

export function readPosition(pbf, end) {
	return pbf.readFields(
		readPositionField,
		{ latitude: 0, longitude: 0, bearing: 0, odometer: 0, speed: 0 },
		end
	);
}
function readPositionField(tag, obj, pbf) {
	if (tag === 1) obj.latitude = pbf.readFloat();
	else if (tag === 2) obj.longitude = pbf.readFloat();
	else if (tag === 3) obj.bearing = pbf.readFloat();
	else if (tag === 4) obj.odometer = pbf.readDouble();
	else if (tag === 5) obj.speed = pbf.readFloat();
}
export function writePosition(obj, pbf) {
	if (obj.latitude) pbf.writeFloatField(1, obj.latitude);
	if (obj.longitude) pbf.writeFloatField(2, obj.longitude);
	if (obj.bearing) pbf.writeFloatField(3, obj.bearing);
	if (obj.odometer) pbf.writeDoubleField(4, obj.odometer);
	if (obj.speed) pbf.writeFloatField(5, obj.speed);
}

export function readTripDescriptor(pbf, end) {
	return pbf.readFields(
		readTripDescriptorField,
		{
			trip_id: '',
			route_id: '',
			direction_id: 0,
			start_time: '',
			start_date: '',
			schedule_relationship: 0,
			modified_trip: undefined
		},
		end
	);
}
function readTripDescriptorField(tag, obj, pbf) {
	if (tag === 1) obj.trip_id = pbf.readString();
	else if (tag === 5) obj.route_id = pbf.readString();
	else if (tag === 6) obj.direction_id = pbf.readVarint();
	else if (tag === 2) obj.start_time = pbf.readString();
	else if (tag === 3) obj.start_date = pbf.readString();
	else if (tag === 4) obj.schedule_relationship = pbf.readVarint();
	else if (tag === 7)
		obj.modified_trip = readTripDescriptorModifiedTripSelector(pbf, pbf.readVarint() + pbf.pos);
}
export function writeTripDescriptor(obj, pbf) {
	if (obj.trip_id) pbf.writeStringField(1, obj.trip_id);
	if (obj.route_id) pbf.writeStringField(5, obj.route_id);
	if (obj.direction_id) pbf.writeVarintField(6, obj.direction_id);
	if (obj.start_time) pbf.writeStringField(2, obj.start_time);
	if (obj.start_date) pbf.writeStringField(3, obj.start_date);
	if (obj.schedule_relationship) pbf.writeVarintField(4, obj.schedule_relationship);
	if (obj.modified_trip)
		pbf.writeMessage(7, writeTripDescriptorModifiedTripSelector, obj.modified_trip);
}

export const TripDescriptorScheduleRelationship = {
	SCHEDULED: 0,
	ADDED: 1,
	UNSCHEDULED: 2,
	CANCELED: 3,
	REPLACEMENT: 5,
	DUPLICATED: 6,
	DELETED: 7
};

export function readTripDescriptorModifiedTripSelector(pbf, end) {
	return pbf.readFields(
		readTripDescriptorModifiedTripSelectorField,
		{ modifications_id: '', affected_trip_id: '', start_time: '', start_date: '' },
		end
	);
}
function readTripDescriptorModifiedTripSelectorField(tag, obj, pbf) {
	if (tag === 1) obj.modifications_id = pbf.readString();
	else if (tag === 2) obj.affected_trip_id = pbf.readString();
	else if (tag === 3) obj.start_time = pbf.readString();
	else if (tag === 4) obj.start_date = pbf.readString();
}
export function writeTripDescriptorModifiedTripSelector(obj, pbf) {
	if (obj.modifications_id) pbf.writeStringField(1, obj.modifications_id);
	if (obj.affected_trip_id) pbf.writeStringField(2, obj.affected_trip_id);
	if (obj.start_time) pbf.writeStringField(3, obj.start_time);
	if (obj.start_date) pbf.writeStringField(4, obj.start_date);
}

export function readVehicleDescriptor(pbf, end) {
	return pbf.readFields(
		readVehicleDescriptorField,
		{ id: '', label: '', license_plate: '', wheelchair_accessible: 0 },
		end
	);
}
function readVehicleDescriptorField(tag, obj, pbf) {
	if (tag === 1) obj.id = pbf.readString();
	else if (tag === 2) obj.label = pbf.readString();
	else if (tag === 3) obj.license_plate = pbf.readString();
	else if (tag === 4) obj.wheelchair_accessible = pbf.readVarint();
}
export function writeVehicleDescriptor(obj, pbf) {
	if (obj.id) pbf.writeStringField(1, obj.id);
	if (obj.label) pbf.writeStringField(2, obj.label);
	if (obj.license_plate) pbf.writeStringField(3, obj.license_plate);
	if (obj.wheelchair_accessible) pbf.writeVarintField(4, obj.wheelchair_accessible);
}

export const VehicleDescriptorWheelchairAccessible = {
	NO_VALUE: 0,
	UNKNOWN: 1,
	WHEELCHAIR_ACCESSIBLE: 2,
	WHEELCHAIR_INACCESSIBLE: 3
};

export function readEntitySelector(pbf, end) {
	return pbf.readFields(
		readEntitySelectorField,
		{ agency_id: '', route_id: '', route_type: 0, trip: undefined, stop_id: '', direction_id: 0 },
		end
	);
}
function readEntitySelectorField(tag, obj, pbf) {
	if (tag === 1) obj.agency_id = pbf.readString();
	else if (tag === 2) obj.route_id = pbf.readString();
	else if (tag === 3) obj.route_type = pbf.readVarint(true);
	else if (tag === 4) obj.trip = readTripDescriptor(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 5) obj.stop_id = pbf.readString();
	else if (tag === 6) obj.direction_id = pbf.readVarint();
}
export function writeEntitySelector(obj, pbf) {
	if (obj.agency_id) pbf.writeStringField(1, obj.agency_id);
	if (obj.route_id) pbf.writeStringField(2, obj.route_id);
	if (obj.route_type) pbf.writeVarintField(3, obj.route_type);
	if (obj.trip) pbf.writeMessage(4, writeTripDescriptor, obj.trip);
	if (obj.stop_id) pbf.writeStringField(5, obj.stop_id);
	if (obj.direction_id) pbf.writeVarintField(6, obj.direction_id);
}

export function readTranslatedString(pbf, end) {
	return pbf.readFields(readTranslatedStringField, { translation: [] }, end);
}
function readTranslatedStringField(tag, obj, pbf) {
	if (tag === 1)
		obj.translation.push(readTranslatedStringTranslation(pbf, pbf.readVarint() + pbf.pos));
}
export function writeTranslatedString(obj, pbf) {
	if (obj.translation)
		for (const item of obj.translation) pbf.writeMessage(1, writeTranslatedStringTranslation, item);
}

export function readTranslatedStringTranslation(pbf, end) {
	return pbf.readFields(readTranslatedStringTranslationField, { text: '', language: '' }, end);
}
function readTranslatedStringTranslationField(tag, obj, pbf) {
	if (tag === 1) obj.text = pbf.readString();
	else if (tag === 2) obj.language = pbf.readString();
}
export function writeTranslatedStringTranslation(obj, pbf) {
	if (obj.text) pbf.writeStringField(1, obj.text);
	if (obj.language) pbf.writeStringField(2, obj.language);
}

export function readTranslatedImage(pbf, end) {
	return pbf.readFields(readTranslatedImageField, { localized_image: [] }, end);
}
function readTranslatedImageField(tag, obj, pbf) {
	if (tag === 1)
		obj.localized_image.push(readTranslatedImageLocalizedImage(pbf, pbf.readVarint() + pbf.pos));
}
export function writeTranslatedImage(obj, pbf) {
	if (obj.localized_image)
		for (const item of obj.localized_image)
			pbf.writeMessage(1, writeTranslatedImageLocalizedImage, item);
}

export function readTranslatedImageLocalizedImage(pbf, end) {
	return pbf.readFields(
		readTranslatedImageLocalizedImageField,
		{ url: '', media_type: '', language: '' },
		end
	);
}
function readTranslatedImageLocalizedImageField(tag, obj, pbf) {
	if (tag === 1) obj.url = pbf.readString();
	else if (tag === 2) obj.media_type = pbf.readString();
	else if (tag === 3) obj.language = pbf.readString();
}
export function writeTranslatedImageLocalizedImage(obj, pbf) {
	if (obj.url) pbf.writeStringField(1, obj.url);
	if (obj.media_type) pbf.writeStringField(2, obj.media_type);
	if (obj.language) pbf.writeStringField(3, obj.language);
}

export function readShape(pbf, end) {
	return pbf.readFields(readShapeField, { shape_id: '', encoded_polyline: '' }, end);
}
function readShapeField(tag, obj, pbf) {
	if (tag === 1) obj.shape_id = pbf.readString();
	else if (tag === 2) obj.encoded_polyline = pbf.readString();
}
export function writeShape(obj, pbf) {
	if (obj.shape_id) pbf.writeStringField(1, obj.shape_id);
	if (obj.encoded_polyline) pbf.writeStringField(2, obj.encoded_polyline);
}

export function readStop(pbf, end) {
	return pbf.readFields(
		readStopField,
		{
			stop_id: '',
			stop_code: undefined,
			stop_name: undefined,
			tts_stop_name: undefined,
			stop_desc: undefined,
			stop_lat: 0,
			stop_lon: 0,
			zone_id: '',
			stop_url: undefined,
			parent_station: '',
			stop_timezone: '',
			wheelchair_boarding: 0,
			level_id: '',
			platform_code: undefined
		},
		end
	);
}
function readStopField(tag, obj, pbf) {
	if (tag === 1) obj.stop_id = pbf.readString();
	else if (tag === 2) obj.stop_code = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 3) obj.stop_name = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 4) obj.tts_stop_name = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 5) obj.stop_desc = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 6) obj.stop_lat = pbf.readFloat();
	else if (tag === 7) obj.stop_lon = pbf.readFloat();
	else if (tag === 8) obj.zone_id = pbf.readString();
	else if (tag === 9) obj.stop_url = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 11) obj.parent_station = pbf.readString();
	else if (tag === 12) obj.stop_timezone = pbf.readString();
	else if (tag === 13) obj.wheelchair_boarding = pbf.readVarint();
	else if (tag === 14) obj.level_id = pbf.readString();
	else if (tag === 15) obj.platform_code = readTranslatedString(pbf, pbf.readVarint() + pbf.pos);
}
export function writeStop(obj, pbf) {
	if (obj.stop_id) pbf.writeStringField(1, obj.stop_id);
	if (obj.stop_code) pbf.writeMessage(2, writeTranslatedString, obj.stop_code);
	if (obj.stop_name) pbf.writeMessage(3, writeTranslatedString, obj.stop_name);
	if (obj.tts_stop_name) pbf.writeMessage(4, writeTranslatedString, obj.tts_stop_name);
	if (obj.stop_desc) pbf.writeMessage(5, writeTranslatedString, obj.stop_desc);
	if (obj.stop_lat) pbf.writeFloatField(6, obj.stop_lat);
	if (obj.stop_lon) pbf.writeFloatField(7, obj.stop_lon);
	if (obj.zone_id) pbf.writeStringField(8, obj.zone_id);
	if (obj.stop_url) pbf.writeMessage(9, writeTranslatedString, obj.stop_url);
	if (obj.parent_station) pbf.writeStringField(11, obj.parent_station);
	if (obj.stop_timezone) pbf.writeStringField(12, obj.stop_timezone);
	if (obj.wheelchair_boarding) pbf.writeVarintField(13, obj.wheelchair_boarding);
	if (obj.level_id) pbf.writeStringField(14, obj.level_id);
	if (obj.platform_code) pbf.writeMessage(15, writeTranslatedString, obj.platform_code);
}

export const StopWheelchairBoarding = {
	UNKNOWN: 0,
	AVAILABLE: 1,
	NOT_AVAILABLE: 2
};

export function readTripModifications(pbf, end) {
	return pbf.readFields(
		readTripModificationsField,
		{ selected_trips: [], start_times: [], service_dates: [], modifications: [] },
		end
	);
}
function readTripModificationsField(tag, obj, pbf) {
	if (tag === 1)
		obj.selected_trips.push(readTripModificationsSelectedTrips(pbf, pbf.readVarint() + pbf.pos));
	else if (tag === 2) obj.start_times.push(pbf.readString());
	else if (tag === 3) obj.service_dates.push(pbf.readString());
	else if (tag === 4)
		obj.modifications.push(readTripModificationsModification(pbf, pbf.readVarint() + pbf.pos));
}
export function writeTripModifications(obj, pbf) {
	if (obj.selected_trips)
		for (const item of obj.selected_trips)
			pbf.writeMessage(1, writeTripModificationsSelectedTrips, item);
	if (obj.start_times) for (const item of obj.start_times) pbf.writeStringField(2, item);
	if (obj.service_dates) for (const item of obj.service_dates) pbf.writeStringField(3, item);
	if (obj.modifications)
		for (const item of obj.modifications)
			pbf.writeMessage(4, writeTripModificationsModification, item);
}

export function readTripModificationsModification(pbf, end) {
	return pbf.readFields(
		readTripModificationsModificationField,
		{
			start_stop_selector: undefined,
			end_stop_selector: undefined,
			propagated_modification_delay: 0,
			replacement_stops: [],
			service_alert_id: '',
			last_modified_time: 0
		},
		end
	);
}
function readTripModificationsModificationField(tag, obj, pbf) {
	if (tag === 1) obj.start_stop_selector = readStopSelector(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 2) obj.end_stop_selector = readStopSelector(pbf, pbf.readVarint() + pbf.pos);
	else if (tag === 3) obj.propagated_modification_delay = pbf.readVarint(true);
	else if (tag === 4)
		obj.replacement_stops.push(readReplacementStop(pbf, pbf.readVarint() + pbf.pos));
	else if (tag === 5) obj.service_alert_id = pbf.readString();
	else if (tag === 6) obj.last_modified_time = pbf.readVarint();
}
export function writeTripModificationsModification(obj, pbf) {
	if (obj.start_stop_selector) pbf.writeMessage(1, writeStopSelector, obj.start_stop_selector);
	if (obj.end_stop_selector) pbf.writeMessage(2, writeStopSelector, obj.end_stop_selector);
	if (obj.propagated_modification_delay) pbf.writeVarintField(3, obj.propagated_modification_delay);
	if (obj.replacement_stops)
		for (const item of obj.replacement_stops) pbf.writeMessage(4, writeReplacementStop, item);
	if (obj.service_alert_id) pbf.writeStringField(5, obj.service_alert_id);
	if (obj.last_modified_time) pbf.writeVarintField(6, obj.last_modified_time);
}

export function readTripModificationsSelectedTrips(pbf, end) {
	return pbf.readFields(
		readTripModificationsSelectedTripsField,
		{ trip_ids: [], shape_id: '' },
		end
	);
}
function readTripModificationsSelectedTripsField(tag, obj, pbf) {
	if (tag === 1) obj.trip_ids.push(pbf.readString());
	else if (tag === 2) obj.shape_id = pbf.readString();
}
export function writeTripModificationsSelectedTrips(obj, pbf) {
	if (obj.trip_ids) for (const item of obj.trip_ids) pbf.writeStringField(1, item);
	if (obj.shape_id) pbf.writeStringField(2, obj.shape_id);
}

export function readStopSelector(pbf, end) {
	return pbf.readFields(readStopSelectorField, { stop_sequence: 0, stop_id: '' }, end);
}
function readStopSelectorField(tag, obj, pbf) {
	if (tag === 1) obj.stop_sequence = pbf.readVarint();
	else if (tag === 2) obj.stop_id = pbf.readString();
}
export function writeStopSelector(obj, pbf) {
	if (obj.stop_sequence) pbf.writeVarintField(1, obj.stop_sequence);
	if (obj.stop_id) pbf.writeStringField(2, obj.stop_id);
}

export function readReplacementStop(pbf, end) {
	return pbf.readFields(readReplacementStopField, { travel_time_to_stop: 0, stop_id: '' }, end);
}
function readReplacementStopField(tag, obj, pbf) {
	if (tag === 1) obj.travel_time_to_stop = pbf.readVarint(true);
	else if (tag === 2) obj.stop_id = pbf.readString();
}
export function writeReplacementStop(obj, pbf) {
	if (obj.travel_time_to_stop) pbf.writeVarintField(1, obj.travel_time_to_stop);
	if (obj.stop_id) pbf.writeStringField(2, obj.stop_id);
}
