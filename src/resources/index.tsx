export const resources = [
    {
        name: 'users',
        list: '/refine/users',
        create: '/refine/users/create',
        edit: '/refine/users/edit/:id',
        show: '/refine/users/show/:id',
        meta: {
            canDelete: true,
        },
    },
    {
        name: 'transaction-records',
        list: '/refine/transaction-records',
        create: '/refine/transaction-records/create',
        edit: '/refine/transaction-records/edit/:id',
        show: '/refine/transaction-records/show/:id',
        meta: {
            canDelete: true,
        },
    },
    {
        name: 'blog-posts',
        list: '/refine/blog-posts',
        show: '/refine/blog-posts/show/:id',
        create: '/refine/blog-posts/create',
        edit: '/refine/blog-posts/edit/:id',
    },
];
