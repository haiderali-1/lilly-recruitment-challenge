# Lilly Technical Challenge Documentation

## Approach
To tackle this challenge, the first thing I had to understand was where the software currently stood. I began by reading through all necessary material and seeing what parts of files needed to be changed and what I had to work with. I read through the requirements and started by testing API endpoints using Postman to see what responses I would get. Upon testing, I got a better understanding of what I needed to do to make a functional frontend.

I began by completing the challenge, which was the /average endpoint. This was an easy place to start as it would complete the majority of the backend and allow me to shift my focus to the frontend. 

Once it was functional, I launched the index.html and began planning how I was going to make improvements to enhance user experience. I realised the best way of tackling this task would be to list the Medicines first, as many of the functions I planned to include on the frontend relied on the list being there. I conducted research on different ways I could do this and found a solution involving the createElement method, which made sense to me due to its flexibility and scalability. It also made the code very clear and would allow practically anyone to pick it up and understand its function.

With the /average endpoint complete and a plan, I was ready to move forward with the frontend features. I completed the fetchMedicines() function, learning skills such as validating data from the API in the process. This knowledge proved valuable later when implementing features like the filter. Although it was tedious at times, I managed to get it working relatively quickly.

I then implemented the addMedicine() function, which was fairly simple, taking ideas from fetchMedicines() function as well as understanding from Postman testing. There were very few issues, only some fine-tuning which would be done later on - such as a timeout on messages and resetting the form fields to refine the user experience.

After this, I implemented the updateMedicine() function. Since it was also a POST request like addMedicine(), the implementation was straightforward, requiring only minor adjustments such as changing the endpoint and messages.

A similar process followed with the deleteMedicine() function, with a few key differences. It was a DELETE request and only one user input: the name of the medicine to delete. However, I decided to add a function of my own in this; a checkbox. I included this as a function to improve user experience, as deleting a medicine can be quite serious, adding an extra layer of security to the process. Using my understanding of EventListeners, I completed it without many issues.

The next feature I implemented was the fetchAvg() function, which retrieved the average price of all medicines, leveraging the /average endpoint previously completed. I added an event listener to a button on the frontend that triggers a fetch request when clicked, which then displays the average to the user, only including medicines with both a price and a name.

Upon completion of the general functions, I implemented a filterMedicine() function. This was one of the more complex features, but I completed it using the understanding I gained from working on the previous functions. It took a user input for price range and displayed the data which matched the criteria: if an input was invalid it would display an error message and the filter action would not occur. It also handled situations where no medicines were found, displaying a message on the frontend. Additionally, it includes a reset button which clears all the forms filled and fetches the complete list of medicines again. This adds to a user-friendly frontend.

## Objectives - Innovative Solutions
This project was fairly straightforward and I don't think I did anything particularly too impressive. However, I feel as though my order of operations was impressive; my plan of what I was going to add and when meant that parts from previous implementations could translate down the line, ultimately concluding with the filterMedicine() method which combined learnings from all the previous methods, streamlining my experience.

Times where I did re-write code included the layout of the frontend. I was constantly shifting around elements, trying to get it as good as I can and ending on a user-friendly and relatively uncomplicated solution.

## Problems Faced
A few issues arose when doing this project, particularly in the start. I found a few issues when implementing my /average endpoint; specifically what values were being allowed, as seen by errors in my terminal and Postman - https://imgur.com/a/JoICISR. This issue happened because I didn't initially include logic, which removed values without a price and caused problems with computing those values. After altering my code I successfully recieved an average based off valid medicines. I also limited it to 2dp to make it more user-friendly.

There were also some other small problems, such as forms unable to take in a decimal point, which was fixed by changing the input type to a double rather than a number, and a problem with clearing the form as I was using the div id rather than the form id when resetting it, leading to an error which was quickly fixed.

## Evaluation
Overall, I feel as though this challenge went very well. It was very well-organised and I completed it to a good standard with the limited time-frame, even adding some extra features along the way. It was fun and a great way to show off my development skills. Later parts of the process were easier to implement due to the skills I had developed with earlier parts. If I were to do this again, I would add more interactive features while ensuring no negative impacts on user-experience.