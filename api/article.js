import {request} from '@/plugins/request';

export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
};

export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
};

export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
};

export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
};

export const createArticle = data => {
    return request({
        method: 'POST',
        url: `/api/articles`,
        data
    })
};

export const updateArticle = (data, slug) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data
    })
};

export const deleteArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`
    })
};

export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
};

export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
};

export const addComment = (slug, data) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
};

export const deleteComment = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`,
    })
};
