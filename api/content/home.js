import request from '@/util/axios';

export const getOneList = () => {
	return request({
		url: 'web/home/one',
		method: 'get'
	})
}

export const getTwoList = (params) => {
	return request({
		url: 'web/home/two',
		method: 'get',
		params: {
		  ...params
		}
	})
}

export const getRecommendList = (params) => {
	return request({
		url: 'web/home/recommend',
		method: 'get',
		params: {
			...params
		}
	})
}

export const inShop = (id) => {
	return request({
		url: 'web/home/in_shop',
		method: 'get',
		params: {
			id
		}
	})
}

export const selectSpecif = (params) => {
	return request({
		url: 'web/home/specif',
		method: 'get',
		params: {
			...params
		}
	})
}



export const commdity = (id) => {
	return request({
		url: 'web/home/commdity',
		method: 'get',
		params: {
			id
		}
	})
}