﻿using System;

namespace ApeVolo.Common.Caches.Redis.Abstractions;

/// <inheritdoc />
/// <summary>
/// An abstract attribute that for kafka attribute or rabbit mq attribute
/// </summary>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true)]
public abstract class TopicAttribute : Attribute
{
    protected TopicAttribute(string name)
    {
        Name = name;
    }

    /// <summary>
    /// Topic or exchange route key name.
    /// </summary>
    public string Name { get; }

    /// <summary>
    /// Default group name is CapOptions setting.(Assembly name)
    /// kafka --> groups.id
    /// rabbit MQ --> queue.name
    /// </summary>
    public string Group { get; set; }
}