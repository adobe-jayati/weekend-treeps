export default async function decorate(block){
  const result = await fetch('registration.json')
  .then(response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // Parse the JSON data
  })
  .then(result => {
      console.log('result',result);
      console.log('result.data', result.data);
      let formData = result.data;
      console.log('formData', formData);

      const formContainers = document.getElementsByClassName('registration');
        console.log("formContainers", formContainers)
      if (formContainers.length > 0) {
          const formContainer = formContainers[0]; 
          
          const form = document.createElement('form');

          form.action = '/submit-data.json'; 
          form.method = 'POST'; 
          form.id = 'register';        

          formData.forEach(field => {
              console.log("field", field)
              const label = document.createElement('label');
              label.setAttribute('for', field.id);
              label.textContent = field.Label;
              form.appendChild(label);
              
              // Create input or textarea
              let input;
              if (field.Type === 'textarea') {
                  input = document.createElement('textarea');
                  input.id = field.id;
                  input.name = field.Label;
                  input.placeholder = field.Placeholder;
              } else if (field.Type === 'submit') {
                  input = document.createElement('button');
                  input.id = field.id;
                  input.name = field.Label;
                  input.type = field.Type;
                  input.textContent = 'Submit';
              }
               else {
                  input = document.createElement('input');
                  input.type = field.Type;
                  input.id = field.id;
                  input.name = field.Label;
                  input.placeholder = field.Placeholder;
                  if (field.Mandatory === "x") {
                      input.required = true;
                  }
              }
              form.appendChild(input);
          });
          // Append form to the container
          formContainer.appendChild(form);

          // Handle form submission
          form.addEventListener('submit', function(event) {
              event.preventDefault();

              const userInfo = {
                  name: document.getElementById('name').value,
                  email: document.getElementById('email').value,
                  interest: document.getElementById('interest').value
              };

              // Log user information as JSON
              console.log('User Information:', JSON.stringify(userInfo, null, 2));
              fetch('/submit-data.json', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userInfo) // Send JSON payload
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then(data => console.log('Success:', data))
              .catch(error => console.error('Error:', error));

              // Clear the form after submission
              alert(`Thank you ${userInfo.name} for registering! Your email ${userInfo.email} have been added to the waiting list.`);
              form.reset();
          });

          
      } else {
          console.error('No elements found with the class "registration".');
      }

  })

  document.getElementById('register').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from refreshing the page
      
      const formData = new FormData(this);
      const formObject = Object.fromEntries(formData.entries()); // Convert to JSON
      
      
  });
}