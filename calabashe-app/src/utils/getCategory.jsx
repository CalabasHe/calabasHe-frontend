const getCategoryfromSlug = (pathSlug) =>{
  const newSlug = pathSlug.split("-") .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  return newSlug
}

export default getCategoryfromSlug;