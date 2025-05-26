const HandleAdjective = (rating) => {  
  if(rating == 0){
    return
  }else if (0 < rating && rating < 2.5){
    return('Poor')
  }else if(2.5 <= rating && rating < 3.5 ){
    return('Average')
  }else if(3.5 <= rating && rating < 4.0 ){
    return('Good')
  }else if( rating >= 4.0){
    return('Excellent')
  }
}

export default HandleAdjective;