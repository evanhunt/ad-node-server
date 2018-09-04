module.exports = {
    apps: [
        {
            name: 'AD-SERVER',
            script: './bin/www',
            // cwd: '/d/workspace/ad-node-server',
            exec_mode: 'cluster',
            instances: 'max',
            max_memory_restart: '300M',
            min_uptime: 50000,
            max_restarts: 5,
            watch: true,
            ignore_watch: [
                'node_modules',
                'logs',
                '.git',
                '_logs',
                'plugins'
            ],
            watch_options: {
                followSymlinks: false
            },
            out_file: './logs/access.log',
            error_file: './logs/error.log',
            log_type: 'json',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],
    // test config
    // deploy: {
    //     production: {
    //         user: 'node',
    //         host: '212.83.163.1',
    //         ref: 'origin/master',
    //         repo: 'git@github.com:repo.git',
    //         path: '/var/www/production',
    //         'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    //     }
    // }
};
