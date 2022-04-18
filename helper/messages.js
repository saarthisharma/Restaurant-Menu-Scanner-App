let customMessages = {
    "passwordNotMatch" :"Password is incorrect",
    "userAlreadyExists": "User already exists with the given email",
    "userCreated" : "New user successfully created",
    "successLoggedIn": "Successfully logged in",
    "Loginerror" : "Email id or password is incorrect",
    "logoutMessage":"User logged out successfully",
    "updateProfile":"Profile updated successfully",
    "TokenDatabaseEmpty":"Unable to authenticate",
    "invalidToken": 'Invalid Token',
    "passwordResetLinkMessage":"Email has been sent successfully",
    "passwordChangeSuccess": 'Password updated successfully',
    "error" : "Internal server error",

    // Restaurant Timing
    "timeSame":"opening time and closing time cannot be same",
    "closingTimeLess":"Closing Time must be greater than Opening Time",
    // Restaurant
    "restaurantSaved": 'Restaurant saved successfully',
    "restaurantList": 'List of Restaurants',
    "NoDataFound": 'No Data Found',
    "restaurantProfileUpdated": 'Restaurant profile updated successfully',

    // Category
    "categoryNotCreate":"Error ! category not created",
    "categorySaved": 'Category saved successfully',
    "categoryProfile": 'Category profile fetched',
    "categoryUpdated": 'Category updated successfully',
    "cantUpdateCategory": 'Cannot update category',
    "cantDeleteCategory": 'Cannot delete category',
    "categoryList": 'List of category',
    "categoryDeleted": 'Category deleted successfully',

    // menu Item
    itemSaved: 'Menu Item saved successfully',
    categoryItemProfile: 'Menu Item Profile fetched',
    cantDeleteCategoryItem: 'Unable to delete menu item',
    menuItemDeleted: 'Menu item deleted succesfully',
    menuitemUpdated: 'Menu Item updated successfully',
    cantUpdateCategoryItem: 'Unable to update menu item',
    menuItemList: 'List of menu items',
    itemOrderNoExist: 'Item order no already exist',
    menuItemNotFound: 'Menu item not found',
    cannotAddMoreItem: 'You can not add more item',

    // otp
    "alreadyExists": "phone number or email is already registered with us",
    "otpNotFound":"OTP not Found ",
    "otpVerified":"OTP Verified Successfully"
}
module.exports = {
    customMessages
}