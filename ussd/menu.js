const UssdMenu = require('ussd-menu-builder');
const Queue = require('../models/Queue');
const session = require('./session');

const menu = new UssdMenu();

// Attach session storage
menu.sessionConfig(session);

// Define menu flow
menu.startState({
  run: () => {
    menu.con('Welcome to Queue System\n1. Join Queue\n2. Check Position\n3. Cancel');
  },
  next: {
    '1': 'joinQueue',
    '2': 'checkPosition',
    '3': 'cancelPosition'
  }
});

menu.state('joinQueue', {
  run: () => {
    menu.con('Select Service:\n1. Customer Service\n2. Technical Support\n3. Billing');
  },
  next: {
    '1': 'joinQueue.service',
    '2': 'joinQueue.service',
    '3': 'joinQueue.service'
  }
});

menu.state('joinQueue.service', {
  run: async () => {
    const services = ['Customer Service', 'Technical Support', 'Billing'];
    const service = services[Number(menu.val) - 1];
    const count = await Queue.countDocuments({ service });
    const newEntry = new Queue({
      phoneNumber: menu.args.phoneNumber,
      service,
      position: count + 1
    });
    await newEntry.save();

    await menu.session.set('service', service);
    menu.con(`You're #${count + 1} in ${service}\n1. Check Position\n2. Cancel`);
  },
  next: {
    '1': 'checkPosition',
    '2': 'cancelPosition'
  }
});

menu.state('checkPosition', {
  run: async () => {
    const user = await Queue.findOne({ phoneNumber: menu.args.phoneNumber });
    if (!user) {
      menu.con('You are not in any queue.\n0. Back');
    } else {
      menu.con(`Your position in ${user.service} queue is #${user.position}\n0. Back`);
    }
  },
  next: { '0': 'start' }
});

menu.state('cancelPosition', {
  run: async () => {
    const deleted = await Queue.findOneAndDelete({ phoneNumber: menu.args.phoneNumber });
    if (!deleted) {
      menu.con('No active queue to cancel.\n0. Back');
    } else {
      menu.con('You have been removed from the queue.\n0. Back');
    }
  },
  next: { '0': 'start' }
});

module.exports = menu;
