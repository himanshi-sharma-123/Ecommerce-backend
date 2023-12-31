const { Order } = require("../model/Order");
const { User } = require("../model/User");
const { sendMail, invoiceTemplate } = require("../services/common");

exports.fetchOrdersByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id });

    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    const user = await User.findById(order.user);
    // we can use await for this also
    sendMail({
      to: user.email,
      html: invoiceTemplate(order),
      subject: "Order Recieved",
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.fetchOrdersByUser = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const orders = await Order.find({ user: userId });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

// exports.createOrder = async (req, res) => {
//   const order = new Order(req.body);

//   try {
//     const doc = await order.save();
//     res.status(201).json(doc);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

// exports.deleteOrder = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const order = await Order.findByIdAndDelete(id);
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

// exports.updateOrder = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const order = await Order.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(200).json(order);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

exports.fetchAllOrders = async (req, res) => {
  //here we need all query string
  // filter = {"category":["smartphone","laptops"]}
  //sort = {_sort:"price",_order:"desc"}
  //pagination={_page:1,_limit=10 }
  // we have to try with multiple categories and brands after change in frontend

  // let query = Order.find({});
  // let totalOrdersQuery = Order.find({});
  let query = Order.find({ deleted: { $ne: true } });
  let totalOrdersQuery = Order.find({ deleted: { $ne: true } });

  //TODO: How to get sort on discounted Price not on Actual Price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.count().exec();
  console.log(totalDocs);

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  // const product = new Product(req.body);

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};
