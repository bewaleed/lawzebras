import axios from './axios'

const login = (email, password) => {
    return axios.post('/auth/admin-login', {
        email, password
    })
}

const getUsers = () => {
    return axios.get('/admin/get-users')
}
const getLawyers = () => {
    return axios.get('/admin/get-lawyers')
}

// const getLatest = () => {
//     return axios.post('/v1/auth/week-user')
// }
// const DeleteUser = (id) => {
//     return axios.post('/v1/auth/delete',{
//         id
//     });
// }
const getFaqs = () => { 
    return axios.get('/admin/get-faqs')
}
const AddFaqs = (description) => {
    return axios.post('/admin/add-faq', {
        description
    })
}
const updateFaq = (description,faqId) => {
    return axios.put('/admin/update-faq/'+faqId, {
        description
    })
}
const getPrivacy = (type) => {
    if(type=="privacy policy")
    return axios.get('/admin/privacy-policy')
    else if(type=="terms & conditions")
    return axios.get('/admin/term-condition')
    else if(type=="disclaimer")
    return axios.get('/admin/get-disclaimer')
    else if(type=="about us")
    return axios.get('/admin/get-about')
}
const updatePrivacy = (description,type) => {
    return axios.put(
        type=="privacy policy"?'/admin/update-privacy-policy':
        type=="disclaimer"?'/admin/add-update-disclaimer':
        type=="about us"?'/admin/add-update-about':'/admin/update-term-condition',{
        description
    })
}
const getReviews = () => {
    return axios.get('/users/pending-reviews');
}
const deletePrivacy = (id,type) => {
    return axios.delete(
        type=="terms"?'/admin/term-condition/'+id : type=="disclaimer"?
        '/admin/delete-disclaimer/'+id : type=="about us"? 
        '/admin/delete-about/'+id : '/admin/privacy-policy/'+id
    )
}
const updateReviewStatus = (status,id) => {
    return axios.put('/users/update-review-status/'+id,{
        status
    })
}
const deleteFaq = (faqId) => {
    return axios.delete('/admin/delete-faq/'+faqId)
}
const userStatus = (userId, status) => {
    return axios.put('/admin/update-user-status', {
        userId, status
    })
}
const lawyerStatus = (status , lawyer_id) => {
    return axios.patch('/admin/update-lawyer-status', {
        status, lawyer_id
    })
}
const updateProfile = (data) => {
    return axios.put('/admin/update-profile',data)
}
const getNotifications = () => {
    return axios.get('/admin/admin-notifications')
}
const getPayments = () => {
    return axios.get('/admin/pro-plan-users')
}
const addWelcomeEmail = (template,url,type) => {
    return axios.post('/admin/'+url,{
        template,type
    })
}
const deleteNotification = (id) => {
    return axios.delete('/admin/admin-delete-notification/'+id)
}
const getTemplate = (type) => {
    return axios.get('/admin/get-template/'+type)
}
const addRoles = (sub_categories) => {
    return axios.post('/admin/add-role',{
        sub_categories
    })
}
const addUser = (email,full_name,roles) => {
    return axios.post('/admin/admin-add-user',{
        email,full_name,roles
    })
}
export default {
    login,
    getUsers,
    AddFaqs,
    getFaqs,
    updateFaq,
    deleteFaq,
    userStatus,
    getLawyers,
    lawyerStatus,
    getPrivacy,
    updatePrivacy,
    deletePrivacy,
    updateProfile,
    getNotifications,
    getReviews,
    updateReviewStatus,
    deleteNotification,
    getPayments,
    addWelcomeEmail,
    getTemplate,
    addRoles,
    addUser
}