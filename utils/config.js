var domain;

if (process.env.Node_ENV === 'production') {
    
} else {
    domain = 'http://localhost:3000/api'
}

export default domain;