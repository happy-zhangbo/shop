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

export const getRecommendList = (current,size,params) => {
	return request({
		url: 'web/home/recommend',
		method: 'get',
		params: {
			...params,
			current,
			size
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

export const index_swiper = (params) => {
	return request({
		url: 'web/home/index_swiper',
		method: 'get',
		params: {
		  ...params
		}
	})
}

export const getNearbyList = (current,size,params) => {
	return request({
		url: 'web/home/nearby',
		method: 'get',
		params: {
		  ...params,
		  current,
		  size
		}
	})
}

export const getViewCountShop = (current,size,params) => {
	return request({
		url: 'web/home/view_count_shop',
		method: 'get',
		params: {
		  ...params,
		  current,
		  size
		}
	})
}

export const getSearchResult = (keyword) => {
	return request({
		url: 'web/home/search',
		method: 'get',
		params: {
		  ...keyword
		}
	})
}

export const getSuggest = (keyword) => {
	return request({
		url: 'web/home/suggest',
		method: 'get',
		params: {
		  ...keyword
		}
	})
}

export const getCity = (location) => {
	return request({
		url: 'web/home/location',
		method: 'get',
		params: {
		  ...location
		}
	})
}
