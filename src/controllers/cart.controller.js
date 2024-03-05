const addItemToCart = async (req, res) => {
  try {
    const { quantity, productId } = req.body;
    const userId = req.user._id; // Replace 'req.user._id' with actual user ID from request

    // Check if product already exists in cart
    const existingCart = await Cart.findOne({ user: userId, product: productId });

    if (existingCart) {
      // Update quantity of existing cart item
      existingCart.quantity += quantity;
      await existingCart.save();
    } else {
      // Create new cart item
      const newCartItem = new Cart({
        quantity,
        product: productId,
        user: userId
      });
      await newCartItem.save();
    }

    res.status(200).json({ success: true, message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const getItemById = async (req, res) => {

}

const getAllCart = async (req, res) => {

}

const emptyCart = async (req, res) => {

}

const deleteFromCart = async (req, res) => {
    const { id } = req.params
    try {
        const cart = await Cart.findByIdAndDelete(id)

        if (cart) {
            res.send({
                status: 'success',
                message: cart
            })
        } else {
            res.send({
                status: 'failed',
                message: "Wrong productId"
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const removeCartItem = async (req, res) => {

}

const updateCartQuantity = async (req, res) => {

}


// export async function getCartByUser(req, res) {
//     const { user } = req.query
//     try {
//         const cartItems = await Cart.find({ user: user }).populate('User').populate('Product');
//         res.send({
//             status: "success",
//             message: cartItems
//         })

//     } catch (error) {
//         console.log(error)
//         res.send({
//             status: "failed",
//             message: error.message
//         })
//     }
// }

// // export async function updateCart(req, res) {
// //     const { id } = req.params
// //     try {
// //         const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true })

// //         if (cart) {
// //             res.send({
// //                 status: 'success',
// //                 message: cart
// //             })
// //         } else {
// //             res.send({
// //                 status: 'failed',
// //                 message: "cart doesn't updated"
// //             })
// //         }

// //     } catch (error) {
// //         console.log(error)
// //     }
// // }
