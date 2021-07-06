import Product from "../../models/Product";

export const DELETE_PRODUCT='DELETE_PRODUCT';
export const CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS='SET_PRODUCTS';

export const deleteProduct=productId=>{
    return async dispatch=>{
        await  fetch(`https://bazaar-316b7-default-rtdb.firebaseio.com/products/${productId}.json`,
        {
            method:'DELETE'
        });
        dispatch({
            type:DELETE_PRODUCT,
            pid:productId
        });
    }

};
 
export const createProduct=(title,description,imageUrl,price)=>{
    return async dispatch=>{
        //async code
      const response=await  fetch('https://bazaar-316b7-default-rtdb.firebaseio.com/products.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });
        const resData=await response.json();
        // console.log(resData);
        dispatch({
            type:CREATE_PRODUCT,
            productData:{
                // title:title,same as title,
                id:resData.name,
                title,
                description,
                imageUrl,
                price,
            }
        });
    };

};

export const updateProduct=(id,title,description,imageUrl)=>{
    return async dispatch=>{
     await  fetch(`https://bazaar-316b7-default-rtdb.firebaseio.com/products/${id}.json`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                description,
                imageUrl
            })
        }
        );

        dispatch({
            type:UPDATE_PRODUCT,
            pd:id,
            productData:{
                title,
                description,
                imageUrl,
            }
        });
    }
   
 }

 export const fetchProducts=()=>{
     return async dispatch=>{
        
        //async code
        try{
            const response=await  fetch('https://bazaar-316b7-default-rtdb.firebaseio.com/products.json'
            // method:'GET',//default and no need of headers and body
      );
      if(!response.ok){
          throw new Error('Something went wrong!');
      }
        const resData=await response.json();
        // console.log(resData);
        const loadedProducts=[];
        for(const key in resData){
            loadedProducts.push(new Product(
                key,
                'u1',
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price
                )
            );
        }
         dispatch({type:SET_PRODUCTS,products:loadedProducts})
        }
        catch(err){
            //send to custom analytics error
            throw err;
        }
      
     } 
 };