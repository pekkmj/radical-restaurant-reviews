import React from "react";

const NewReviewForm = (props) => {
  console.log(props)
  const emptyNewReview = {
    id: '',
    subject: '', 
    body: '',
    rating: ''
  }

  // const [newReview, setNewReview] = useState(emptyNewReview)

  // const handleInputChange = (event) => {
  //   setNewReview({
  //     ...newReview,
  //     [event.currentTarget.name]: event.currentTarget.value
  //   })
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   if (await addNewReview(newReview)) {
  //     clearForm()
  //   }
  // }

  // const addNewReview = async (formData) => {
  //   try {
  //     const response = await fetch('/api/v1/reviews', {
  //       method: "POST",
  //       headers: new Headers({
  //         "Content-Type": "application/json"
  //       }),
  //       body: JSON.stringify({ formData })
  //     })
  //     if (!response.ok) {
  //       if (response.status === 422) {
  //         const errorBody = await response.json()
  //         const newErrors = translateServerErrors(errorBody.errors)
  //         return setErrors(newErrors)
  //       }
  //       throw new Error(`${response.status} ${response.statusText}`)
  //     } else {
  //       const { newRestaurant } = await response.json();
  //       setRestaurants([...restaurants, newRestaurant])
  //       setErrors({})
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error(`Fetch post error: ${error.name} ${error.message}`)
  //   }
  // }

  return (
    <h1>Hello???</h1>
  )
}

export default NewReviewForm