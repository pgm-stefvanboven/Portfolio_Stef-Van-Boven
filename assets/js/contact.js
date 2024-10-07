/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_3oud8l2', 'template_mmgswrb', '#contact-form', 'HESmiOlwxv1NGfRn9')
        .then(()=> {
            // Show sent message
            contactMessage.textContent = 'Message sent successfully ✅'

            // Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)

            // Clear input fields
            contactForm.reset()
        }, () => {
            // Show error message
            contactMessage.textContent = 'Message not sent (service error) ❌'

            // Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)
        
        })
    
}

contactForm.addEventListener('submit', sendEmail)