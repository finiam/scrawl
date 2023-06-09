import pkg from 'crypto-js';
const { enc, RC4 } = pkg;

const IV = enc.Utf8.parse('123');

export const encrypt = (data: string, key: string) => {
	if (!data) {
		return data;
	}

	return RC4.encrypt(data, enc.Utf8.parse(key), {
		iv: IV
	}).toString();
};

export const decrypt = (encData: string, key: string) => {
	if (!encData) {
		return encData;
	}

	return RC4.decrypt(encData, enc.Utf8.parse(key), {
		iv: IV
	}).toString(enc.Utf8);
};

function bulk(fields: Record<string, string>, fn: (val: string) => string) {
	const out = { ...fields };

	for (const field in fields) {
		if (field !== 'id' && field !== 'user' && field !== 'folder') {
			out[field] = fn(out[field]) || '';
		}
	}

	return out;
}

export function decryptFields<T>(key: string, fields: Record<string, string>) {
	return bulk(fields, (val) => decrypt(val, key)) as T;
}

export function encryptFields(key: string, fields: Record<string, string>) {
	return bulk(fields, (val) => encrypt(val, key));
}
