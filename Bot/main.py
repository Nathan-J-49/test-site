import discord
import os
from keep_alive import keep_alive
from descord.ext.commands import Bot

intents.presences = True
intents.members = True
client = Bot(command_prefix = "?", intents = intents)

bot = discord.Client()

@client.event
async def on_ready():
    output("Bot is ready, logged in as {0.user}".format(client))


@client.event
async def on_message(message):
    await message.channel.send("gruh")